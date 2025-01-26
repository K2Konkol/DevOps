resource "random_id" "this" {
  byte_length = 8
}

resource "google_storage_bucket" "this" {
  name          = "terraform-series-tfstate-${random_id.this.hex}"  # bucket name must be unique across GCP
  location      = "EU"
  versioning {
    enabled = true
  }
  public_access_prevention = "enforced"  # default is inherited from the organisation
}