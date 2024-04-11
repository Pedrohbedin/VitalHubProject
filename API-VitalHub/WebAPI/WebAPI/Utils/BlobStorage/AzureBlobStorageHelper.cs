using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
			try
			{
				if (arquivo != null)
				{
					var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

					var blobServiceClient = new BlobServiceClient(stringConexao);

					var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

					var blobClient = blobContainerClient.GetBlobClient(blobName);

					using (var stream = arquivo.OpenReadStream())
					{
						await blobClient.UploadAsync(stream, true);
					}

					return blobClient.Uri.ToString();
				}
				else
				{
					return "https://vitalhubg04t.blob.core.windows.net/vitalhubg40t/profilePatern.jpg";

                }
			}
			catch (Exception)
			{

				throw;
			}
        }
    }
}
