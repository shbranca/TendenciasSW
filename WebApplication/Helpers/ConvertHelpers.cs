using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Helpers
{
    public class ConvertHelpers
    {
        public static DateTime DatepickerToDatetime(string date)
        {
            return DateTime.ParseExact(date, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
        }
    }
}
