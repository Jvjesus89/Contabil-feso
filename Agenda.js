document.addEventListener('DOMContentLoaded', function () {
    const availableTimes = [
      {
        title: 'Disponível para Reservas',
        start: '2025-04-09T09:00:00',
        end: '2025-04-09T17:00:00',
        color: '#28a745',
        classNames: ['fc-vago']
      },
      {
        title: 'Disponível para Consultas',
        start: '2025-04-10T09:00:00',
        end: '2025-04-10T17:00:00',
        color: '#28a745',
        classNames: ['fc-vago']
      },
      {
        title: 'Disponível para Consultas',
        start: '2025-04-11T09:00:00',
        end: '2025-04-11T17:00:00',
        color: '#28a745',
        classNames: ['fc-vago']
      }
    ];
  
    let EventosAgendado = [
      {
        title: 'Reunião de equipe',
        start: '2025-04-09T10:00:00',
        end: '2025-04-09T12:00:00',
        color: 'red',
        classNames: ['fc-event'],
        extendedProps: {
          duvida: "Alinhamento semanal",
          usuario: "admin"
        }
      }
    ];
  
    const allEvents = availableTimes.concat(EventosAgendado);
    const calendarEl = document.getElementById('calendar');
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'pt-br',
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        list: 'Agenda'
      },
      events: allEvents,
      editable: true,
      selectable: true,
  
      selectAllow: function (selectInfo) {
        return !EventosAgendado.some(function (event) {
          return (
            selectInfo.start < new Date(event.end) &&
            selectInfo.end > new Date(event.start)
          );
        });
      },
  
      select: function (info) {
        if (localStorage.getItem('estaLogado') !== 'true') {
          alert('Precisa ser feito o login antes de fazer o agendamento');
          return;
        }

        if (availableTimes.some(function(event) {
          return (
              info.start < new Date(event.end) &&
              info.end > new Date(event.start)
          );
      }))
      {// Exibir o modal
      var modal = document.getElementById('myModal');
      modal.style.display = 'block';
  
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
  
        // Oculta campo "Agendado por" (aparece só em edição)
        document.getElementById('info-agendado').style.display = 'none';
  
        // Limpa os campos
        document.getElementById('duvida').value = '';
        document.getElementById('tipoAgendamento').value = '';
  
        const selectedStart = info.start;
        const selectedEnd = info.end;
  
        const closeModal = modal.querySelector('.close');
        closeModal.onclick = () => modal.style.display = 'none';
  
        const form = modal.querySelector('form');
  
        // Remove botão excluir se existir (por segurança)
        const oldBtn = form.querySelector('.delete-event');
        if (oldBtn) oldBtn.remove();
  
        form.onsubmit = function (e) {
          e.preventDefault();
  
          const title = document.getElementById('tipoAgendamento').value || 'Novo Evento';
          const duvida = document.getElementById('duvida').value || 'Sem detalhes';
          const usuario = localStorage.getItem("nomeUsuario") || "Desconhecido";

  
          const novoEvento = {
            title: title,
            start: selectedStart,
            end: selectedEnd,
            classNames: ['fc-event'],
            extendedProps: {
              duvida: duvida,
              usuario: usuario
            }
          };
  
          EventosAgendado.push(novoEvento);
          calendar.addEvent(novoEvento);
  
          modal.style.display = 'none';
          calendar.unselect();
        };
      },
  
      eventClick: function (info) {
        const event = info.event;
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
  
        document.getElementById('duvida').value = event.extendedProps.duvida || '';
        document.getElementById('tipoAgendamento').value = event.title;
        document.getElementById('agendado-por').textContent = event.extendedProps.usuario || 'Desconhecido';
        document.getElementById('info-agendado').style.display = 'block';
  
        const form = modal.querySelector('form');
  
        // Remove botão de exclusão anterior, se existir
        const oldBtn = form.querySelector('.delete-event');
        if (oldBtn) oldBtn.remove();
  
        // Cria botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'delete-event';
        deleteButton.type = 'button';
        deleteButton.style.marginTop = '10px';
        deleteButton.style.backgroundColor = '#dc3545';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.padding = '10px 20px';
        deleteButton.style.cursor = 'pointer';
  
        deleteButton.onclick = function () {
          event.remove();
  
          EventosAgendado = EventosAgendado.filter(e =>
            !(e.start === event.start.toISOString() && e.end === event.end.toISOString())
          );
  
          modal.style.display = 'none';
        };
  
        form.appendChild(deleteButton);
  
        const closeModal = modal.querySelector('.close');
        closeModal.onclick = () => modal.style.display = 'none';
      }
    });
  
    calendar.render();
  });
  