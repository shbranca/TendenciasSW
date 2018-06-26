using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;


namespace WebApplication.Helpers
{
    public static class HtmlHelpers
    {
        public static async Task<IHtmlContent> PartialForAsync<TModel, TProperty>(this IHtmlHelper<TModel> helper, Expression<Func<TModel, TProperty>> expression, string partialViewName, string prefixName = "")
        {
            object model = ExpressionMetadataProvider.FromLambdaExpression(expression, helper.ViewData, helper.MetadataProvider).Model;
            var viewData = new ViewDataDictionary(helper.ViewData)
            {
                TemplateInfo = { HtmlFieldPrefix = prefixName }
            };
            return await helper.PartialAsync(partialViewName, model, viewData);
        }
    }
}
