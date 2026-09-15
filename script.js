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

/* Account screens: presentation and client-side validation only. */
const authDialog = document.querySelector('#auth-dialog');
const authForm = document.querySelector('#auth-form');
const authPassword = document.querySelector('#auth-password');
const authConfirm = document.querySelector('#auth-confirm');
const authName = document.querySelector('#auth-name');
const authFeedback = document.querySelector('#auth-feedback');
const passwordToggle = document.querySelector('#password-toggle');
let authMode = 'login';
function setAuthMode(mode) {
  authMode = mode;
  authForm.reset();
  authConfirm.setCustomValidity('');
  authName.setCustomValidity('');
  authFeedback.textContent = '';
  const signup = mode === 'signup';
  const reset = mode === 'reset';
  document.querySelector('#auth-title').textContent = signup ? 'ابدأ خطوتك الأولى.' : reset ? 'نسيت كلمة المرور؟' : 'سعداء بعودتك.';
  document.querySelector('#auth-description').textContent = reset ? 'معاينة لاستعادة كلمة المرور؛ لن يُرسل أي بريد.' : 'واجهة تجريبية فقط؛ لن تُرسل بياناتك أو يُنشأ حساب.';
  document.querySelector('#auth-submit').textContent = signup ? 'تجربة إنشاء حساب ←' : reset ? 'معاينة طلب الاستعادة ←' : 'تجربة تسجيل الدخول ←';
  document.querySelector('#auth-name-field').hidden = !signup;
  document.querySelector('#auth-confirm-field').hidden = !signup;
  document.querySelector('#auth-password-field').hidden = reset;
  document.querySelector('#password-hint').hidden = !signup;
  document.querySelector('#forgot-password').hidden = mode !== 'login';
  document.querySelector('#back-to-login').hidden = !reset;
  authName.disabled = authConfirm.disabled = !signup;
  authName.required = authConfirm.required = signup;
  authPassword.disabled = reset;
  authPassword.required = !reset;
  authPassword.minLength = signup ? 8 : 1;
  authPassword.type = 'password';
  passwordToggle.textContent = 'إظهار';
  passwordToggle.setAttribute('aria-label', 'إظهار كلمة المرور');
  passwordToggle.setAttribute('aria-pressed', 'false');
  document.querySelectorAll('[data-auth-mode]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.authMode === mode));
  });
}
document.querySelector('#open-login').addEventListener('click', () => {
  setAuthMode('login');
  authDialog.showModal();
  document.body.classList.add('auth-is-open');
  document.querySelector('#auth-email').focus();
});
document.querySelector('#close-auth').addEventListener('click', () => authDialog.close());
document.querySelector('#auth-home').addEventListener('click', () => authDialog.close());
authDialog.addEventListener('close', () => {
  authForm.reset();
  authPassword.type = 'password';
  authFeedback.textContent = '';
  document.body.classList.remove('auth-is-open');
  document.querySelector('#open-login').focus();
});
document.querySelectorAll('[data-auth-mode]').forEach(button => button.addEventListener('click', () => setAuthMode(button.dataset.authMode)));
document.querySelector('#forgot-password').addEventListener('click', () => {
  setAuthMode('reset');
  document.querySelector('#auth-email').focus();
});
document.querySelector('#back-to-login').addEventListener('click', () => setAuthMode('login'));
passwordToggle.addEventListener('click', () => {
  const reveal = authPassword.type === 'password';
  authPassword.type = reveal ? 'text' : 'password';
  passwordToggle.textContent = reveal ? 'إخفاء' : 'إظهار';
  passwordToggle.setAttribute('aria-label', reveal ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور');
  passwordToggle.setAttribute('aria-pressed', String(reveal));
});
function validateAuthFields() {
  authConfirm.setCustomValidity(authMode === 'signup' && authConfirm.value !== authPassword.value ? 'كلمتا المرور غير متطابقتين.' : '');
  authName.setCustomValidity(authMode === 'signup' && !authName.value.trim() ? 'أدخل اسمًا غير فارغ.' : '');
}
authForm.addEventListener('input', () => {
  authFeedback.textContent = '';
  validateAuthFields();
});
authForm.addEventListener('submit', event => {
  event.preventDefault();
  validateAuthFields();
  if (!authForm.reportValidity()) return;
  authFeedback.textContent = authMode === 'signup'
    ? 'اكتملت معاينة النموذج بنجاح. لم يُنشأ حساب ولم تُحفظ بياناتك.'
    : authMode === 'reset'
      ? 'اكتملت معاينة طلب الاستعادة. لم يُرسل بريد إلكتروني.'
      : 'اكتملت معاينة تسجيل الدخول. لم يتم التحقق من حساب أو إنشاء جلسة دخول.';
  authForm.reset();
  authPassword.type = 'password';
  passwordToggle.textContent = 'إظهار';
  passwordToggle.setAttribute('aria-label', 'إظهار كلمة المرور');
  passwordToggle.setAttribute('aria-pressed', 'false');
});
