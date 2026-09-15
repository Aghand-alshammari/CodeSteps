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
