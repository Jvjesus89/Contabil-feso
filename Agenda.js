    document.addEventListener('DOMContentLoaded', function() {
                            // Definindo os horários disponíveis como eventos
                            var availableTimes = [
            {
                title: 'Disponível para Reservas',
                start: '2025-04-09T09:00:00',
                end: '2025-04-09T17:00:00',
                color: '#28a745', // Cor verde para indicar disponibilidade
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
            // Eventos já agendados
            var EventosAgendado = [
            {
                title: 'Reunião de equipe',
                start: '2025-04-09T10:00:00',
                end: '2025-04-09T12:00:00',
		color: 'red', // Cor vermelha para indicar indisponível
                classNames: ['fc-event']
            }
        ];

        var allEvents = availableTimes.concat(EventosAgendado); // Combina todos os eventos

        var calendarEl = document.getElementById('calendar');
        
        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'pt-br',
            initialView: 'timeGridWeek', // Visualização Semanal
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay' // Vistas de mês, semana, e dia
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
selectAllow: function(selectInfo) {
                // Verifica se a seleção conflita com eventos existentes
                return !EventosAgendado.some(function(event) {
                    return (
                        selectInfo.start < new Date(event.end) &&
                        selectInfo.end > new Date(event.start)
                    );
                });
            },
select: function(info) {
    // verifica se usuario está logado
    if (localStorage.getItem('estaLogado') != 'true') {
                        alert('Precisa ser feito o login antes de fazer o agendamento');
                        return  
                    }                  
    
    // Verifica se o horário está disponível para agendamento
                    if (availableTimes.some(function(event) {
                        return (
                            info.start < new Date(event.end) &&
                            info.end > new Date(event.start)
                        );
                    }))
                    {// Exibir o modal
                    var modal = document.getElementById('myModal');
                    modal.style.display = 'block';

                     // Limpar os dados do textarea e outras entradas do formulário
                    document.getElementById('duvida').value = '';

                    // Salva o horário selecionado em variáveis globais ou campos escondidos
                    var selectedStart = info.start;
                    var selectedEnd = info.end;

                    // Configurar o botão de fechar no modal
                    var closeModal = document.querySelector('.modal .close');
                    closeModal.addEventListener('click', function() {
                    modal.style.display = 'none';
                    });

                    // Configura o botão de confirmar do formulário
                    var form = modal.querySelector('form');
                    form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var title = document.getElementById('tipoAgendamento').value || 'Novo Evento';
                    var duvida = document.getElementById('duvida').value || 'Sem detalhes';
                    EventosAgendado.push({
                        title: title,
                        duvida: duvida,
                        start: selectedStart,
                        end: selectedEnd,
                        classNames: ['fc-event']
                    });

                    calendar.addEvent({
                        title: title,
                        start: selectedStart,
                        end: selectedEnd,
                        allDay: false,
                        extendedProps: {
                        duvida: duvida
                        },
                        classNames: ['fc-event']
                    });

                    modal.style.display = 'none'; // Fechar o modal após confirmar
                    
                     // Limpar variáveis selecionadas
                    selectedStart = null;
                    selectedEnd = null;

                    calendar.unselect(); // Limpar a seleção do calendário
                    });   
                    }else{
                        alert('Este horário (' + info.start.toLocaleString() + ') não está disponivel para agendamento.');   
                    }
                    calendar.unselect();
                }
                ,
                eventClick: function(info) {
                // Pega o evento clicado
                    var event = info.event;

                // Exibir o modal
                    var modal = document.getElementById('myModal');
                    modal.style.display = 'block';

                    // Preencher o modal com as informações do evento
                    document.getElementById('duvida').value = event.extendedProps.duvida || '';
                    document.getElementById('tipoAgendamento').value = event.title;

                // Adiciona um botão para excluir o evento
                    var deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.style.marginTop = '10px';
                    deleteButton.style.backgroundColor = '#dc3545';
                    deleteButton.style.color = 'white';
                    deleteButton.style.border = 'none';
                    deleteButton.style.padding = '10px 20px';
                    deleteButton.style.cursor = 'pointer';

                // Adiciona o botão ao modal, garantindo que só exista um botão
                var form = modal.querySelector('form');
                var existingButton = form.querySelector('.delete-event');
                    if (existingButton) {
                      existingButton.remove();
                    }
                    deleteButton.className = 'delete-event';
                    form.appendChild(deleteButton);

                deleteButton.addEventListener('click', function() {
                // Remove o evento do calendário
                    event.remove();

                // Remove o evento da lista `EventosAgendado`
                    EventosAgendado = EventosAgendado.filter(function(e) {
                        return e.start !== event.start.toISOString() || e.end !== event.end.toISOString();
                });

                // Fecha o modal
                    modal.style.display = 'none';
                });

                // Configurar o botão de fechar no modal
                var closeModal = document.querySelector('.modal .close');
                closeModal.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            }
            });

            calendar.render();
        });