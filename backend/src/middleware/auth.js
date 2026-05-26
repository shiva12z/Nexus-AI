import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { getSupabaseAdmin } from "../config/supabase.js";
import { UnauthorizedError, ForbiddenError } from "../utils/errors.js";

export function signToken(payload) {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, config.jwt.secret);
}

export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid authorization header");
    }

    const token = header.slice(7);
    const decoded = verifyToken(token);

    const supabase = getSupabaseAdmin();
    const { data: user, error } = await supabase
      .from("users")
      .select("id, team_id, email, full_name, role, status")
      .eq("id", decoded.userId)
      .single();

    if (error || !user) throw new UnauthorizedError("User not found");

    req.user = user;
    req.teamId = user.team_id;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new UnauthorizedError("Invalid or expired token"));
    }
    next(err);
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(new UnauthorizedError());
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError(`Requires role: ${roles.join(" or ")}`));
    }
    next();
  };
}
