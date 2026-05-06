namespace PatientAPI.Helpers
{
    public class FileHelper
    {
        private readonly IWebHostEnvironment _env;

        public FileHelper(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> SaveReportAsync(IFormFile file, string patientName)
        {
            var folder = Path.Combine(_env.WebRootPath, "reports", patientName);
            Directory.CreateDirectory(folder);

            var filePath = Path.Combine(folder, $"{Guid.NewGuid()}_{file.FileName}");
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/reports/{patientName}/{Path.GetFileName(filePath)}";
        }

        public async Task<string> SaveBillingAsync(IFormFile file, string patientName)
        {
            var folder = Path.Combine(_env.WebRootPath, "billings", patientName);
            Directory.CreateDirectory(folder);

            var filePath = Path.Combine(folder, $"{Guid.NewGuid()}_{file.FileName}");
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/billings/{patientName}/{Path.GetFileName(filePath)}";
        }
    }
}
