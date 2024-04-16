using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptingKey = "e67857f0218f46a59da8ea21c7b63a8c";

        private readonly string _endPoint = "https://cvvitalhub3g04t.cognitiveservices.azure.com/";

        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptingKey))
                {
                    Endpoint = _endPoint
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception)
            {

                return "Erro ao reconhecer o texto";
            }
        }
        
        private static string ProcessRecognitionResult(OcrResult result)
        {
            try
            {
                string recognizeText = "";

                foreach (var region in result.Regions) 
                {
                    foreach (var line in region.Lines)
                    {
                        foreach (var word in line.Words)
                        {
                            recognizeText += word.Text + " ";
                        }
                        recognizeText += "\n";
                    }
                }

                return recognizeText;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
