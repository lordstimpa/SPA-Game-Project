using Newtonsoft.Json;

namespace SPAGame.Models
{
    public class AnswerModel
    {
        [JsonProperty("gameTitles")]
        public List<string> Answers { get; set; }
    }
}
