using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.BlobStorage;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }

        public UsuarioController()
        {
            usuarioRepository = new UsuarioRepository();
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, AlterarSenhaViewModel senha)
        {
            try
            {
                usuarioRepository.AlterarSenha(email, senha.SenhaNova!);

                return Ok("Senha alterada com sucesso !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("AlterarFotoPerfil")]
        public async Task<IActionResult> UploadProfileImage(Guid idUsuario, UsuarioViewModel user) 
        {
            try
            {
                Usuario usuarioBuscado = usuarioRepository.BuscarPorId(idUsuario);
                if(usuarioBuscado == null)
                {
                    return NotFound();
                }

                var connectionString = "DefaultEndpointsProtocol=https;AccountName=vitalhubg04t;AccountKey=BQheSOFQGwYfUEfN1S1zsrIBJWuGnDwwCdHRGneA1HhGS3lfnVPLW5ccuv2m/QIQg7c2dQtqWR3Z+ASt42s3fg==;EndpointSuffix=core.windows.net";

                var containerName = "vitalhubg40t";

                string fotoUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!, connectionString, containerName);

                //usuarioBuscado.Foto = fotoUrl;

                usuarioRepository.AtualizarFoto(idUsuario, fotoUrl);

                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
