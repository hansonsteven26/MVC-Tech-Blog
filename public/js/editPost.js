const editPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update blog post');
    }
  } catch (err) {
    console.error(err);
  }
};

const editButtons = document.querySelectorAll('.edit-post');
editButtons.forEach((button) => {
  button.addEventListener('click', editPost);
});
