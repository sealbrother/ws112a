document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('questionForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const question = formData.get('question');
    const answer = formData.get('answer');

    const data = { question, answer };

    try {
      const response = await fetch('http://localhost:8000/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('問題已提交！');
        form.reset();
      } else {
        alert('提交問題失敗！');
      }
    } catch (error) {
      console.error('錯誤:', error);
      alert('提交問題時出現錯誤！');
    }
  });
});