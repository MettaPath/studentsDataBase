(function () {
    // для работы с localstorage
    let arrayLocal = [];

    // создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.classList.add('mb-4');
        appTitle.innerHTML = title;
        return appTitle;
    }
    // создаем и возвращаем форму для создания новой позиции
    function createStudentItemForm() {
        let form = document.createElement('form');
        let formTitle = document.createElement('h3');
        let inputName = document.createElement('input');
        let nameLabel = document.createElement('label');
        let inputFaculty = document.createElement('input');
        let facultyLabel = document.createElement('label');
        let inputDateBirth = document.createElement('input');
        let birthLabel = document.createElement('label');
        let inputStartStudy = document.createElement('input');
        let startStudyLabel = document.createElement('label');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        formTitle.textContent = 'Форма добавления студентов в базу данных'

        nameLabel.textContent = 'Введите Ф. И. O.';
        facultyLabel.textContent = 'Введите название факультета';
        birthLabel.textContent = 'Введите дату рождения';
        startStudyLabel.textContent = 'Введите год начала обучения';

        form.classList.add('input-group', 'mb-3');
        // инупуты
        inputName.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');
        inputFaculty.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');
        inputDateBirth.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');
        inputStartStudy.classList.add('form-control-sm', 'mb-2', 'mr-1', 'col-6');

        inputName.placeholder = 'Ф. И. О.';
        inputFaculty.placeholder = 'Факультет';
        inputDateBirth.placeholder = 'Дата рождения';
        inputStartStudy.placeholder = 'Год начала учебы';

        inputName.setAttribute('reqired', true);
        inputFaculty.setAttribute('required', true);
        inputDateBirth.setAttribute('required', true);
        inputStartStudy.setAttribute('required', true);

        inputName.setAttribute('id', 'name')
        inputFaculty.setAttribute('id', 'faculty');
        inputDateBirth.setAttribute('id', 'date-of-birth');
        inputStartStudy.setAttribute('id', 'start');

        inputName.setAttribute('type', 'text')
        inputFaculty.setAttribute('type', 'text');
        inputDateBirth.setAttribute('type', 'date');
        inputStartStudy.setAttribute('type', 'number');
        inputStartStudy.setAttribute('min', '2000');
        inputStartStudy.setAttribute('max', '2100');

        // кнопка
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn-sm', 'btn-primary', 'ml-5');
        button.textContent = 'Добавить новые данные';
        buttonWrapper.append(button);


        form.append(formTitle);
        form.append(inputName);
        form.append(nameLabel);

        form.append(inputFaculty);
        form.append(facultyLabel);

        form.append(inputDateBirth);
        form.append(birthLabel);

        form.append(inputStartStudy);
        form.append(startStudyLabel);
        form.append(buttonWrapper);

        button.setAttribute('disabled', 'disabled');
        inputName.addEventListener('input', enabledBtn);

        function enabledBtn() {
            if (inputName.value.length > 0) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', 'disabled');
            }
        };

        return {
            form,
            formTitle,
            inputName,
            inputFaculty,
            inputDateBirth,
            inputStartStudy,
            button
        };
    }

    // функция отрисовки после фильтрации
    function rerender(users = undefined) {
        const elements = users ? users : arrayLocal;
        document.getElementById('table-body').innerHTML = '';
        elements.map(user => {
            createStudentItem(user);
        })
    }
    // функция филтрации по значению
    function filter(input, value) {
        let newArr = [...arrayLocal];
        switch (input) {
            case 'name':
                newArr = arrayLocal.filter((user) =>
                    user.name.toLowerCase().includes(value.toLowerCase())
                );
                break;
            case 'faculty':
                newArr = arrayLocal.filter((user) =>
                    user.faculty.toLowerCase().includes(value.toLowerCase())
                );
                break;
            case 'start':
                newArr = arrayLocal.filter((user) => {
                    return user.startOfStudy === value
                });
                break;
            case 'end':
                newArr = arrayLocal.filter((user) => {
                    return user.finishOfstudy === value
                });
                break;
            default: break;
        }
        if (value === '') {
            newArr = arrayLocal;
        }
        rerender(newArr);
    }

    document.getElementById('search-name').addEventListener('input', function () {
        filter('name', this.value)
    })
    document.getElementById('search-faculty').addEventListener('input', function() {
        filter('faculty', this.value)
    })
    document.getElementById('search-start').addEventListener('input', function () {
        filter('start', this.value)
    })
    document.getElementById('search-end').addEventListener('input', function () {
        filter('end', this.value)
    })

    //функции соритировки столбоцов
    function sortBy(typeOfsort) {
        switch (typeOfsort) {
            case 'name':
                arrayLocal.sort(sortByName);
                break;
            case 'faculty':
                arrayLocal.sort(sortByFaculty);
                break;
            case 'dob':
                arrayLocal.sort(sortByBirth);
                break;
            case 'course':
                arrayLocal.sort(sortByStartOfStudy);
                break;
            default: break;
        }
        rerender();
    }

    //сортировка по имени
    function sortByName(a, b) {
        if (a.name < b.name) { return - 1; }
        if (a.name > b.name) { return 1; }
        return 0;
    }
    // сортировка по факультету
    function sortByFaculty(a, b) {
        if (a.faculty < b.faculty) { return - 1; }
        if (a.faculty > b.faculty) { return 1; }
        return 0;
    }
    // сортировка по году рождения
    function sortByBirth(a, b) {
        if (new Date(a.dateOfBirth) > new Date(b.dateOfBirth)) { return - 1; }
        if (new Date(a.dateOfBirth) < new Date(b.dateOfBirth)) { return 1; }
        return 0;
    }
    // сортировка по году начала обучения
    function sortByStartOfStudy(a, b) {
        if (Number(a.startOfStudy) > Number(b.startOfStudy)) { return - 1; }
        if (Number(a.startOfStudy) < Number(b.startOfStudy)) { return  1; }
        return 0;
    }

    document.getElementById('name').addEventListener('click', () => {
        sortBy('name')
    })
    document.getElementById('faculty').addEventListener('click', () => {
        sortBy('faculty')
    })
    document.getElementById('dob').addEventListener('click', () => {
        sortBy('dob')
    })
    document.getElementById('course').addEventListener('click', () => {
        sortBy('course')
    })

    // функция создания новой позиции
    function createStudentItem(user) {
        let tableBody = document.getElementById('table-body')
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let faculty = document.createElement('td');
        let birthday = document.createElement('td');
        let startStudy = document.createElement('td');

        let buttonGroup = document.createElement('td');
        let deleteButton = document.createElement('button');

        //добавляем в колонку все ячейки и кнопку
        row.setAttribute('id', user.id);
        row.append(name, faculty, birthday, startStudy, buttonGroup);

        //добавляем все значения инпутов в ячейки
        name.textContent = user.name;
        faculty.textContent = user.faculty;
        birthday.textContent = `${user.dateOfBirth.split('-').reverse().join('.')} (${getAge(user.dateOfBirth)} лет/года)`;
        startStudy.textContent = calcCurrentLearningCourse(user);

        deleteButton.classList.add('btn-sm', 'btn-danger');
        deleteButton.addEventListener('click', deleteStudentItem);
        deleteButton.textContent = 'удалить';

        buttonGroup.append(deleteButton);
        // добовляем позицию студента
        tableBody.append(row);

        return {
            tableBody,
            row,
            name,
            faculty,
            birthday,
            startStudy,
            deleteButton,
            buttonGroup,
        }
    }

    //функция получения позиций из ls
    function createItemsFromLS() {
        if (localStorage.getItem('students')) {
        arrayLocal = JSON.parse(localStorage.getItem('students'));
            for (let object of arrayLocal) {
                createStudentItem(object);
            }
        }
    }
         // функция получения возраста
        function getAge(dateString) {
            let today = new Date();
            let birthDate = new Date(dateString);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

     //кнопка удаления позииции
    function deleteStudentItem() {
        if (confirm('Вы уверены?')) {
            const studentId = Number(this.parentElement.parentElement.getAttribute('id'));
            document.getElementById(studentId).remove();
            arrayLocal = JSON.parse(localStorage.getItem('students'));
            const newItems = arrayLocal.filter(object => object.id !== studentId);
            console.log(newItems);
            localStorage.setItem('students', JSON.stringify(newItems));
        }
    }

    //функция для отображения года окончания и актуального курса
    function calcCurrentLearningCourse(user) {
        const { startOfStudy } = user;
        const actualYear = new Date().getFullYear();
        const actualMonth = new Date().getMonth();
        //  const actualMonth = 8;
        const course = actualYear - startOfStudy;

        if (course > 4 || (course === 4 && actualMonth > 8)) {
            return ((`${startOfStudy} - ${Number(startOfStudy) + 4} (закончил)`));
        } else {
            return (`${startOfStudy} - ${Number(startOfStudy) + 4} (${course} курс)`);
        }
    };

    // функция по созданию приложения базы данных
    function createStudentsApp(container, title = 'База данных студентов', key) {
        let studentsAppTitle = createAppTitle(title);
        let studentItemForm = createStudentItemForm();

        container.append(studentsAppTitle);
        container.append(studentItemForm.form);

        //отрисовка из ls
        createItemsFromLS();

        //браузер создает событие submit на форме по нажатию на enter или на  кнопку создания дела
        studentItemForm.form.addEventListener('submit', function (e) {
            //эта строчка необходима, чтобы страница не перезагружалась(это стандартное поведение)
            e.preventDefault();

            // данные в localstorage
            let LocStorageData = localStorage.getItem(key);
            if (LocStorageData === null) {
                arrayLocal = [];
            } else {
                arrayLocal = JSON.parse(LocStorageData);
            }
            // функция которая будет пушить позицию в массив для localstorage
            function createObjForArr() {
                const itemObj = {};
                itemObj.name = studentItemForm.inputName.value;
                itemObj.faculty = studentItemForm.inputFaculty.value;
                itemObj.dateOfBirth = studentItemForm.inputDateBirth.value;
                itemObj.startOfStudy = studentItemForm.inputStartStudy.value;
                itemObj.finishOfstudy = String(Number(studentItemForm.inputStartStudy.value) + 4);
                itemObj.id = Math.floor(Math.random() * 15000);
                arrayLocal.push(itemObj);
                return itemObj;
            }
            // создаем констату нового студента
            const user = createObjForArr();
            // передаем ее в функцию создания новой позиции
            createStudentItem(user);
            localStorage.setItem(key, JSON.stringify(arrayLocal));
            studentItemForm.inputName.value = '';
            studentItemForm.inputFaculty.value = '';
            studentItemForm.inputDateBirth.value = '';
            studentItemForm.inputStartStudy.value = '';
        });
    }
    window.createStudentsApp = createStudentsApp;
})();
