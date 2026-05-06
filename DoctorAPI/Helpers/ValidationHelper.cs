using System.Text.RegularExpressions;

namespace DoctorAPI.Helpers
{
    public static class ValidationHelper
    {
        // Validate shift timings format (e.g., "10am - 2pm")
        public static bool IsValidShiftFormat(string shift)
        {
            var regex = new Regex(@"^\d{1,2}(am|pm)\s*-\s*\d{1,2}(am|pm)$", RegexOptions.IgnoreCase);
            return regex.IsMatch(shift);
        }

        // Validate file extension for reports (only PDF, DOCX, JPG, PNG allowed)
        public static bool IsValidReportFile(string fileName)
        {
            var allowedExtensions = new[] { ".pdf", ".docx", ".jpg", ".jpeg", ".png" };
            var ext = Path.GetExtension(fileName).ToLower();
            return allowedExtensions.Contains(ext);
        }

        // Validate specialization string (letters only, no numbers/symbols)
        public static bool IsValidSpecialization(string specialization)
        {
            var regex = new Regex(@"^[a-zA-Z\s]+$");
            return regex.IsMatch(specialization);
        }
    }
}
