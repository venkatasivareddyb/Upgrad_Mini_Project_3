using System.Text.RegularExpressions;

namespace PatientAPI.Helpers
{
    public class ValidationHelper
    {
        public static bool IsValidFileExtension(string fileName)
        {
            var allowedExtensions = new[] { ".pdf", ".docx", ".jpg", ".jpeg", ".png" };
            var ext = Path.GetExtension(fileName).ToLower();
            return allowedExtensions.Contains(ext);
        }

        public static bool IsValidName(string name)
        {
            var regex = new Regex(@"^[a-zA-Z\s]+$");
            return regex.IsMatch(name);
        }
    }
}
