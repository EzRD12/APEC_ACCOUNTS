using Core.Models.Contracts;

namespace Core.Models
{
    /// <summary>
    /// Represents the basic operation results of <see cref="T"/> model response.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BasicOperationResult<T> : IOperationResult<T>
    {
        private BasicOperationResult(string message, bool success, T entity)
        {
            Message = message;
            Success = success;
            Entity = entity;
        }

        /// <summary>
        /// Represents the message operation result
        /// </summary>
        public string Message { get; }

        /// <summary>
        /// Represents if the operation was successful
        /// </summary>
        public bool Success { get; }

        /// <summary>
        /// Represents the operation result
        /// </summary>
        public T Entity { get; }

        /// <summary>
        /// Creates an instance of <see cref="BasicOperationResult{T}"/> successful with the <see cref="T"/> default value
        /// </summary>
        /// <returns>An instance of <see cref="BasicOperationResult{T}"/> successful</returns>
        public static BasicOperationResult<T> Ok()
            => new BasicOperationResult<T>("", true, default(T));

        /// <summary>
        /// Creates an instance of <see cref="BasicOperationResult{T}"/> successfully
        /// </summary>
        /// <param name="entity">An instance of <see cref="T"/></param>
        /// <returns>An instance of <see cref="BasicOperationResult{T}"/> successful</returns>
        public static BasicOperationResult<T> Ok(T entity)
            => new BasicOperationResult<T>("", true, entity);

        /// <summary>
        /// Creates an instance of <see cref="BasicOperationResult{T}"/> for fail case.
        /// </summary>
        /// <param name="message">An <see cref="string"/> value that represents a error message</param>
        /// <returns>An instance of <see cref="BasicOperationResult{T}"/> failed</returns>
        public static BasicOperationResult<T> Fail(string message)
            => new BasicOperationResult<T>(message, false, default(T));
    }
}
