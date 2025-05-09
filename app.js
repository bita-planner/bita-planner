
function saveBlocks() {
    const blocks = [];
    document.querySelectorAll('.block').forEach(block => {
        blocks.push({
            title: block.querySelector('.title').value,
            category: block.querySelector('.category').value,
            progress: block.querySelector('.progress-range').value
        });
    });
    localStorage.setItem('studyBlocks', JSON.stringify(blocks));
}

function loadBlocks() {
    const blocks = JSON.parse(localStorage.getItem('studyBlocks') || "[]");
    const container = document.getElementById('blocks-container');
    container.innerHTML = '';
    blocks.forEach(data => addBlock(data));
}

function addBlock(data = { title: "", category: "", progress: 0 }) {
    const container = document.getElementById('blocks-container');
    const block = document.createElement('div');
    block.className = 'block';
    block.innerHTML = `
        <input type="text" class="title" placeholder="Block Title" value="${data.title}">
        <select class="category">
            <option value="">Select Category</option>
            <option value="study" ${data.category === "study" ? "selected" : ""}>Study</option>
            <option value="break" ${data.category === "break" ? "selected" : ""}>Break</option>
            <option value="review" ${data.category === "review" ? "selected" : ""}>Review</option>
        </select>
        <input type="range" class="progress-range" value="${data.progress}" min="0" max="100" oninput="this.nextElementSibling.style.width=this.value + '%'">
        <div class="progress-bar"><div class="progress" style="width:${data.progress}%"></div></div>
    `;
    container.appendChild(block);
    block.querySelectorAll('input, select').forEach(el => el.addEventListener('change', saveBlocks));
}

window.onload = loadBlocks;
