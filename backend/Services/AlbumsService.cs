namespace backend.Services
{
    public class AlbumsService
    {
        private readonly DatabaseContext _databaseContext;

        public AlbumsService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
    }
}
