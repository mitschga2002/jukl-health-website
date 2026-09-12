// Placeholder helper: real implementation is wired after the Lovable Emails
// setup completes (email domain + scaffold_transactional_email). Until then,
// this throws so the contact submission still saves but no mail is sent.

export async function sendTransactionalEmail(_input: {
  templateName: string;
  recipients: string[];
  templateData: Record<string, unknown>;
}): Promise<void> {
  throw new Error("Email infrastructure not configured yet.");
}
