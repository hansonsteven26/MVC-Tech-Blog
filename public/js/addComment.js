const newComment = document.querySelector('#comment-form');

newComment.addEventListener('submit', async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-text').value.trim();
  const postId = document.querySelector('#post-id').value;

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Error creating comment');
    }
  }
});
