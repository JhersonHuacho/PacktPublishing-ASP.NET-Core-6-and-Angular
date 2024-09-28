﻿using Microsoft.EntityFrameworkCore;

namespace WorldCitiesAPI.Data
{
	public class ApiResult<T>
	{
		/// <summary>
		/// Private constructor called by the CreateAsync method.
		/// </summary>
		private ApiResult(List<T> data, int count, int pageIndex, int pageSize)
        {
			Data = data;
			PageIndex = pageIndex;
			PageSize = pageSize;
			TotalCount = count;
			TotalPages = (int)Math.Ceiling(count / (double)pageSize);
		}

		#region Methods
		/// <summary>
		/// Pages a IQueryable source.
		/// </summary>
		/// <param name="source">An IQueryable source of generic
		/// type</param>
		/// <param name="pageIndex">Zero-based current page index
		/// (0 = first page)</param>
		/// <param name="pageSize">The actual size of each
		/// page</param>
		/// <returns>
		/// A object containing the paged result
		/// and all the relevant paging navigation info.
		/// </returns>
		public static async Task<ApiResult<T>> CreateAsync(
			IQueryable<T> source,
			int pageIndex,
			int pageSize)
		{
			var count = await source.CountAsync();
			source = source
				.Skip(pageIndex * pageSize)
				.Take(pageSize);
			
			var data = await source.ToListAsync();

			return new ApiResult<T>(data, count, pageIndex, pageSize);
		}
		#endregion

		#region Properties
		/// <summary>
		/// The data result.
		/// </summary>
		public List<T> Data { get; private set; }

		/// <summary>
		/// Zero-based index of current page.
		/// </summary>
		public int PageIndex { get; private set; }

		/// <summary>
		/// Number of items contained in each page.
		/// </summary>
		public int PageSize { get; private set; }

		/// <summary>
		/// Total items count
		/// </summary>
		public int TotalCount { get; private set; }

		/// <summary>
		/// Total pages count
		/// </summary>
		public int TotalPages { get; private set; }

		/// <summary>
		/// TRUE if the current page has a previous page,
		/// FALSE otherwise.
		/// </summary>
		public bool HasPreviousPage
		{
			get
			{
				return (PageIndex > 0);
			}
		}

		/// <summary>
		/// TRUE if the current page has a next page, FALSE otherwise.
		/// </summary>
		public bool HasNextPage
		{
			get
			{
				return ((PageIndex + 1) < TotalPages);
			}
		}
		#endregion
	}
}
