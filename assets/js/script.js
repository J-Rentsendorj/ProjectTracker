$(document).ready(function () {
    var projectFormEl = $("#projForm");
    var pName = $('input[name="projName"]');
    var pType = $('#projType');
    var pDate = $('input[name="projDate"]');
    var projTable = $('#projTable');
    var projList = []; 

    setInterval(function () {
        var now = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
        $('#currDateTime').text(now);
    }, 1000);  

    var storedProjects = localStorage.getItem("projList");
    if (storedProjects) {
        projList = JSON.parse(storedProjects);
    }

    function createRow(project) {
        var tr = $('<tr>');

        var dueDate = dayjs(project.date, 'YYYY-MM-DD');
        var today = dayjs().startOf('day');

        if (dueDate.isBefore(today, 'day')) {
            tr.addClass('table-danger');
        } else if (dueDate.isSame(today, 'day')) {
            tr.addClass('table-warning');
        }

        var formattedDate = dueDate.format('MMM DD, YYYY');

        var tdName = $('<td>').text(project.name);
        var tdType = $('<td>').text(project.type);
        var tdDate = $('<td>').text(formattedDate);

        tr.append(tdName, tdType, tdDate);

        return tr;
    }

    function initTable() {
        var storedProjects = JSON.parse(localStorage.getItem('projList'));
        if (storedProjects) {
            projList = storedProjects;
        }

        var tbody = $('#projTable').find('tbody');
        tbody.empty();

        for (var i = 0; i < projList.length; i++) {
            var rowEl = createRow(projList[i]);
            tbody.append(rowEl);
        }
    }

    initTable();

    $("#projForm").on("submit", function (event) {
        event.preventDefault();

        var projectName = $('input[name="projName"]').val().trim();
        var projectType = $('#projType').val();
        var projectDate = $('input[name="projDate"]').val();

        var projectObj = {
            name: projectName,
            type: projectType,
            date: projectDate
        };

        projList.push(projectObj);

        localStorage.setItem("projList", JSON.stringify(projList));

        $('input[name="projName"]').val('');
        $('#projType').val('Select Project Type');
        $('input[name="projDate"]').val('');

        initTable();

        $("#projInfoModal").modal("hide");
    });

});

