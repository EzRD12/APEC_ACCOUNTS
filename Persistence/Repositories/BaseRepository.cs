using Core.Models;
using Core.Models.Contracts;
using Core.Ports.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Persistence.Repositories
{
    public class BaseRepository<T>: IGenericRepository<T>
    where T : class, IEntityBase, new()
    {
        private readonly DbContext _context;
        private readonly DbSet<T> _set;

        /// <summary>
        /// Creates an instance of <see cref="BaseRepository{T}"/>
        /// </summary>
        /// <param name="context">An instance of <see cref="DbContext"/></param>
        public BaseRepository(DbContext context)
        {
            _context = context;
            _set = context.Set<T>();
        }

        IOperationResult<T> IGenericRepository<T>.Create(T entity)
        {
            _context.Add(entity);
            return BasicOperationResult<T>.Ok(entity);
        }

        T IGenericRepository<T>.Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> queryable = _set.AsQueryable();

            foreach (Expression<Func<T, object>> include in includes)
            {
                queryable = queryable.Include(include);
            }

            return queryable.FirstOrDefault(predicate);
        }

        IEnumerable<T> IGenericRepository<T>.FindAll(Expression<Func<T, bool>> predicate) => _set.Where(predicate).ToList();

        IEnumerable<T> IGenericRepository<T>.Get()
            => _set.AsEnumerable();

        IOperationResult<T> IGenericRepository<T>.Remove(T entity)
        {
            _context.Remove(entity);

            return BasicOperationResult<T>.Ok();
        }

        void IGenericRepository<T>.Save()
            => _context.SaveChanges();

        bool IGenericRepository<T>.Exists(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> queryable = _set.AsQueryable();

            foreach (Expression<Func<T, object>> include in includes)
            {
                queryable = queryable.Include(include);
            }

            return queryable.Any(predicate);
        }

        IOperationResult<T> IGenericRepository<T>.Update(T entity)
        {
            EntityEntry entityEntry = _context.Entry(entity);
            entityEntry.State = EntityState.Modified;

            return BasicOperationResult<T>.Ok();
        }

        IEnumerable<T> IGenericRepository<T>.FindAll(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> queryable = _set.AsQueryable();

            foreach (Expression<Func<T, object>> include in includes)
            {
                queryable = queryable.Include(include);
            }

            return queryable.Where(predicate).ToList();
        }
    }
}
