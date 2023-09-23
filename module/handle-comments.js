import { format } from 'date-fns'

export function handleComments(comments) {
    return comments.map((comment) => {
        let period = format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss')

        return {
            id: comment.author.id,
            name: comment.author.name
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            date: period,
            text: comment.text.replaceAll('<', '&lt;').replaceAll('>', '&gt; '),
            like: comment.likes,
            isLike: comment.isLike,
        }
    })
}
