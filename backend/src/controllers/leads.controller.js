import * as leadService from "../services/leadService.js";

export async function list(req, res) {
  const leads = await leadService.listLeads(req.teamId, {
    status: req.query.status,
    limit: parseInt(req.query.limit || "50", 10),
    offset: parseInt(req.query.offset || "0", 10),
  });
  res.json({ success: true, data: leads });
}

export async function update(req, res) {
  const lead = await leadService.updateLead(req.teamId, req.params.id, req.body);
  res.json({ success: true, data: lead });
}
