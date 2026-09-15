const topics = [
  { title: 'المتغيرات وأنواع البيانات', description: 'تعرّف على كيفية تخزين الأرقام والنصوص واستخدامها داخل برنامجك.', code: 'String name = "Future Developer";' },
  { title: 'الشروط واتخاذ القرارات', description: 'اجعل برنامجك يختار ما ينفّذه بناءً على شرط محدد.', code: 'if (score >= 50) {\n  System.out.println("You passed!");\n}' },
  { title: 'الحلقات وتكرار الأوامر', description: 'تعلّم تكرار المهام دون الحاجة إلى كتابة نفس الكود عدة مرات.', code: 'for (int i = 1; i <= 3; i++) {\n  System.out.println(i);\n}' },
  { title: 'المصفوفات ومجموعات القيم', description: 'خزّن مجموعة من القيم في مكان واحد وتعلّم الوصول إلى عناصرها.', code: 'int[] numbers = {10, 20, 30};\nSystem.out.println(numbers[0]);' },
  { title: 'الدوال وإعادة استخدام الكود', description: 'قسّم برنامجك إلى مهام صغيرة يسهل فهمها وإعادة استخدامها.', code: 'static int add(int a, int b) {\n  return a + b;\n}' },
  { title: 'الأصناف والبرمجة الكائنية', description: 'تعرّف على الأصناف وكيف تجمع البيانات والسلوك داخل كائنات.', code: 'class Student {\n  String name;\n  int score;\n}' }
];

const lessons = document.querySelectorAll('.lesson');
lessons.forEach((lesson) => {
  lesson.addEventListener('click', () => {
    const topic = topics[Number(lesson.dataset.topic)];
    lessons.forEach((item) => {
      const selected = item === lesson;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelector('#topic-title').textContent = topic.title;
    document.querySelector('#topic-description').textContent = topic.description;
    document.querySelector('#topic-code').textContent = topic.code;
  });
});

// Only validated completion flags contribute XP, so reopening cannot award it twice.
const completionKey = 'codesteps.variables.completed.v1';
const draftKey = 'codesteps.variables.draft.v1';
let variablesCompleted = false;
const storageFeedback = document.querySelector('#storage-feedback');
function readSaved(key) {
  try { return localStorage.getItem(key); }
  catch { storageFeedback.textContent = 'التخزين غير متاح؛ سيبقى التقدم والمحاولة خلال هذه الصفحة فقط.'; return null; }
}
function saveValue(key, value) {
  try { localStorage.setItem(key, value); }
  catch { storageFeedback.textContent = 'تعذر الحفظ في المتصفح؛ قد تفقد التقدم أو المحاولة عند إعادة تحميل الصفحة.'; }
}
function renderProgress() {
  const count = variablesCompleted ? 1 : 0;
  document.querySelector('#progress-label').textContent = `${count} من 6 دروس · ${Math.round(count / 6 * 100)}%`;
  const progress = document.querySelector('#course-progress');
  progress.value = count;
  progress.textContent = `${count} من 6`;
  document.querySelector('#xp-total').textContent = `${count * 10} XP`;
  document.querySelector('#lesson-status').textContent = variablesCompleted ? 'مكتمل ✓' : 'غير مكتمل · +10 XP';
  const button = document.querySelector('#complete-lesson');
  button.disabled = variablesCompleted;
  button.textContent = variablesCompleted ? 'أكملت الدرس ✓' : 'أكملت الدرس · +10 XP';
  document.querySelector('#completion-feedback').textContent = variablesCompleted ? 'أكملت أول خطوة! رصيدك 10 XP. يمكنك مراجعة الدرس في أي وقت.' : '';
  document.querySelector('.lesson[data-topic="0"] .lesson-index').textContent = variablesCompleted ? '01 ✓' : '01';
}
variablesCompleted = readSaved(completionKey) === 'true';
renderProgress();
const exercise = document.querySelector('#exercise-code');
exercise.value = readSaved(draftKey) || '';
exercise.addEventListener('input', () => saveValue(draftKey, exercise.value));
document.querySelector('#complete-lesson').addEventListener('click', () => {
  if (variablesCompleted) return;
  variablesCompleted = true;
  saveValue(completionKey, 'true');
  renderProgress();
});
window.addEventListener('storage', (event) => {
  if (event.key === completionKey || event.key === null) {
    variablesCompleted = readSaved(completionKey) === 'true';
    renderProgress();
  }
});
document.querySelectorAll('input[name="variables-quiz"]').forEach((option) => {
  option.addEventListener('change', () => {
    const feedback = document.querySelector('#quiz-feedback');
    const correct = option.value === 'correct';
    feedback.dataset.result = correct ? 'correct' : 'incorrect';
    feedback.textContent = correct
      ? 'صحيح! int يخزّن عددًا صحيحًا، و5 قيمة عددية بدون علامات تنصيص.'
      : option.value === 'text'
        ? 'حاول مرة أخرى: "5" نص بين علامتي تنصيص، بينما int يحتاج عددًا صحيحًا مثل 5.'
        : 'حاول مرة أخرى: boolean يقبل true أو false فقط، ولا يخزّن العدد 5.';
  });
});
document.querySelector('#solution-toggle').addEventListener('click', (event) => {
  const solution = document.querySelector('#model-solution');
  solution.hidden = !solution.hidden;
  event.currentTarget.setAttribute('aria-expanded', String(!solution.hidden));
  event.currentTarget.textContent = solution.hidden ? 'إظهار الحل النموذجي' : 'إخفاء الحل النموذجي';
});
