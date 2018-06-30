using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Constant
{
    public class ConstantHelpers
    {
        public static class ROLES
        {
            public const string SUPERADMIN = "Superadmin";
            public const string ATHLETE = "Athlete";
            public const string COACH = "Coach";            
        }

        public static class SEEDS
        {
            public const bool ENABLED = true;
        }
    }
}
