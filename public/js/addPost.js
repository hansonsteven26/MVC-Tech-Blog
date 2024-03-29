const createPost = document.querySelector('#createPost');

createPost.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log('inside click');

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document
    .querySelector('textarea[name="post-content"]')
    .value.trim();
  console.log(`title: ${title}  content: ${content}`);

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Error creating post');
    }
  }
});
