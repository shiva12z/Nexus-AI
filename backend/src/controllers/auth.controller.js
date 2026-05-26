import * as authService from "../services/authService.js";

export async function signup(req, res) {
  const { email, password, fullName, teamName } = req.body;
  const result = await authService.signup({ email, password, fullName, teamName });
  res.status(201).json({ success: true, data: result });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  res.json({ success: true, data: result });
}

export async function me(req, res) {
  res.json({ success: true, data: { user: req.user } });
}

export async function teamMembers(req, res) {
  const members = await authService.getTeamMembers(req.teamId);
  res.json({ success: true, data: members });
}
