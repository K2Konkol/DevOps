variable "dns-name" {
  description = "DNS zone name."
  default     = "{locals.project_id}-dns-zone"
}

variable "domain" {
  description = "Zone domain."
  default     = "dev-gcp.proarte-studio.pl."
}