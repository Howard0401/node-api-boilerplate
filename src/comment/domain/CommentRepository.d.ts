import { Comment } from '@/comment/domain/Comment';
import { CommentId } from '@/comment/domain/CommentId';
import { MongoRepository } from '@/_lib/DDD';

type CommentRepository = MongoRepository<Comment.Type> & {
  findById(id: CommentId['value']): Promise<Comment.Type>;
};

export { CommentRepository };
