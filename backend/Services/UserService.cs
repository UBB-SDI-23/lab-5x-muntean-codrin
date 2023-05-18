using backend.Helpers;
using backend.Models;
using backend.Models.Extended;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public class UserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _databaseContext;

        public UserService(UserManager<User> userManager, IConfiguration configuration, DatabaseContext databaseContext)
        {
            this._userManager = userManager;
            this._configuration = configuration;
            this._databaseContext = databaseContext;
        }

        public int GetUserCount()
        {
            return _databaseContext.Users.Count();
        }

        public async Task<JwtSecurityToken> GenerateJwt(User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
                {
                    new Claim("Id", user.Id),
                    new Claim("Email", user.Email),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", user.LastName),
                    new Claim("DateOfBirth", user.DateOfBirth.ToString()),
                    new Claim("City", user.City.ToString()),
                    new Claim("Gender", user.Gender.ToString()),
                    //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                //issuer: _configuration["JWT:ValidIssuer"],
                //audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(24),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        public User FindByConfirmationCodeAsync(string confirmationCode)
        {
            var user = _databaseContext.Users.FirstOrDefault(u => u.ConfirmationCode == confirmationCode);
            return user;
        }

        public UserExtended GetUserByEmail(string email)
        {
            var user = _databaseContext.Users.FirstOrDefault(u => u.UserName == email);
            if (user == null)
                return null;
            //calculate entities

            int count = 0;
            //count += _databaseContext.Albums.Where(a => a.AddedBy == email).Count();
            //count += _databaseContext.Artists.Where(a => a.AddedBy == email).Count();
            //count += _databaseContext.Tracks.Where(a => a.AddedBy == email).Count();
            //count += _databaseContext.Playlists.Where(a => a.AddedBy == email).Count();

            var userExtended = new UserExtended(user, count, _databaseContext.Roles.FirstOrDefault(r => _databaseContext.UserRoles.Any(ur => ur.UserId == user.Id && ur.RoleId == r.Id)).Name);
            return userExtended;

        }

        public List<UserExtended> GetAll(PaginationFilter filter)
        {
            var users = _databaseContext.Users
                    .Skip((filter.PageNumber - 1) * filter.PageSize)
                    .Take(filter.PageSize)
                    .OrderBy(a => a.Id)
                    .Select(user => new UserExtended(user,
                        0, _databaseContext.Roles.FirstOrDefault(r => _databaseContext.UserRoles.Any(ur => ur.UserId == user.Id && ur.RoleId == r.Id)).Name)).ToList();
            return users;
        }

        public async Task<bool> UpdateUserRole(string email, string role)
        {
            if (role != "Admin" || role != "Moderator" || role != "User") ;
            var user = _databaseContext.Users.FirstOrDefault(u => u.UserName == email);
            if (user == null) return false;
            bool result;
            if (role == "User")
            {
                result = (await _userManager.RemoveFromRolesAsync(user, new List<string> { "Admin", "Moderator" })).Succeeded;
                return result;
            }

            result = (await _userManager.RemoveFromRolesAsync(user, new List<string> { "Admin", "Moderator" })).Succeeded;
            result = (await _userManager.AddToRoleAsync(user, role)).Succeeded;
            return result;
        }
    }
}
