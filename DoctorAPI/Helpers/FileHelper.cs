using Microsoft.AspNetCore.Http;

namespace DoctorAPI.Helpers
{
    public class FileHelper
    {
        private readonly IWebHostEnvironment _env;

        public FileHelper(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> SaveReportAsync(IFormFile file, string doctorName)
        {
            var folderPath = Path.Combine(_env.WebRootPath, "reports", doctorName);
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return relative URL for frontend
            return $"/reports/{doctorName}/{fileName}";
        }
    }
}
