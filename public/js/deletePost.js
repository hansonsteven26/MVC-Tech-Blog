const deletePost = async (event) => {
  event.preventDefault();

  const postId = event.target.getAttribute('data-id');

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog post');
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteButtons = document.querySelectorAll('.delete-post');
deleteButtons.forEach((button) => {
  button.addEventListener('click', deletePost);
});
