using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;
using SPAGame.Models.ViewModels;
using System.Text.RegularExpressions;

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public GameController(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("startgame")]
        public GameViewModel StartGame()
        {
            string publicId = Guid.NewGuid().ToString();
            string hiddenAnswer = "";

            string filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "Data", "GameTitles.json");

            if (System.IO.File.Exists(filePath))
            {
                string jsonData = System.IO.File.ReadAllText(filePath);
                var answersList = Newtonsoft.Json.JsonConvert.DeserializeObject<AnswerModel>(jsonData);

                if (answersList != null && answersList.Answers != null && answersList.Answers.Count > 0)
                {
                    int randomIndex = new Random().Next(answersList.Answers.Count);

                    string answer = answersList.Answers[randomIndex];
                    string fixedAnswer = Regex.Replace(answer, @"(?<=[a-z])([A-Z])", " $1");
                    hiddenAnswer = Regex.Replace(fixedAnswer, "[a-zA-Z]", "_");

                    _context.Add(new GameModel
                    {
                        PublicId = publicId,
                        Answer = fixedAnswer,
                        HiddenAnswer = hiddenAnswer,
                    });

                    _context.SaveChanges();
                }
                else
                {
                    throw new Exception("List of answers is empty.");
                }
            }
            else
            {
                throw new FileNotFoundException("The JSON data is missing or the file doesn't exist.");
            }

            return new GameViewModel() { GameId = publicId, HiddenAnswer = hiddenAnswer };
        }
    }
}
