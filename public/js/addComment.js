const newComment = document.querySelector('#comment-form');

newComment.addEventListener('submit', async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();
  const postId = document.querySelector('#post-id').value;

  if (text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ text, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Error creating comment');
    }
  }
});
