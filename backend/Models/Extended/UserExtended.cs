namespace backend.Models.Extended
{
    public class UserExtended
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int EntititesAdded { get; set; }

        public UserExtended(User user, int entitiesAdded)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            City = user.City;
            Gender = user.Gender;
            DateOfBirth = user.DateOfBirth;
            EntititesAdded = entitiesAdded;
        }
    }
}
