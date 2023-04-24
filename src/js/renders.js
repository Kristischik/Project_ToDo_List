// Функция рендер для массива make
export function renderMakeToDo(task, idx) {
    return `                       
    <div class="cards-column-card" data-taskid='${idx}'>
       <div class="cards-head">
          <span class="cards-head-logo">ToDo</span>
          <div class="cards-head-date">${task.date}</div>
      </div>
      <div class="cards-text">
          <h2 class="cards-text-title">${task.title}</h2>
          <div class="cards-text-description">
            <p>${task.text}</p>
        </div>
      </div>
      <div class="cards-info">
          <span class="cards-info-name">${task.name}</span>
          <button class="card-to_progress">In progress</button>
          <i class="fa-solid fa-trash" id="card-make_delete"></i>
       </div>
    </div>
`;
};

export function renderProgress(task, idx) {
    return `
    <div class="cards-column-card" data-taskid='${idx}'>
    <div class="cards-head">
        <span class="cards-head-logo">ToDo</span>
        <div class="cards-head-date">${task.date}</div>
    </div>
    <div class="cards-text">
        <h2 class="cards-text-title">${task.title}</h2>
        <div class="cards-text-description">
            <p>${task.text}</p>
        </div>
    </div>
    <div class="cards-info">
        <span class="cards-info-name">${task.name}</span>
        <button class="card-to_make">To Make</button>
        <button class="card-to_done">To Done</button>
        <i class="fa-solid fa-trash" id="card-progress_delete"></i>
    </div>
</div>
    `;
};

export function renderDone(task, idx) {
    return `
    <div class="cards-column-card" data-taskid='${idx}'>
    <div class="cards-head">
        <span class="cards-head-logo">ToDo</span>
        <div class="cards-head-date">${task.date}</div>
    </div>
    <div class="cards-text">
        <h2 class="cards-text-title">${task.title}</h2>
        <div class="cards-text-description">
            <p>${task.text}</p>
        </div>
    </div>
    <div class="cards-info">
        <span class="cards-info-name">${task.name}</span>
        <button class="card-to_progress_back">In progress</button>
        <i class="fa-solid fa-trash" id="card-done_delete"></i>
    </div>
</div>
    `;
};
