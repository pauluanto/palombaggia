import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Eye, EyeOff, GripVertical } from 'lucide-react';

const defaultWidgets = [
  { id: 'weather', title: 'Météo', enabled: true },
  { id: 'revenue', title: 'Revenus', enabled: true },
  { id: 'tasks', title: 'Tâches', enabled: true },
  { id: 'emails', title: 'Emails', enabled: true },
  { id: 'finance', title: 'Finance', enabled: true },
  { id: 'ai', title: 'Assistant IA', enabled: true },
  { id: 'drive', title: 'Documents', enabled: true },
  { id: 'staff', title: 'Personnel', enabled: true }
];

const DashboardCustomizer = () => {
  const [widgets, setWidgets] = useState(defaultWidgets);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const saveLayout = () => {
    localStorage.setItem('dashboardLayout', JSON.stringify(widgets));
    alert('Configuration sauvegardée !');
  };

  const resetLayout = () => {
    setWidgets(defaultWidgets);
    localStorage.removeItem('dashboardLayout');
    alert('Configuration réinitialisée !');
  };

  return (
    <div className="bg-white/90 rounded-xl p-6">
      <h2 className="text-xl font-bold text-luxury-brown mb-4">Personnalisation du Dashboard</h2>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
                        <span>{widget.title}</span>
                      </div>
                      <button
                        onClick={() => toggleWidget(widget.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        {widget.enabled ? (
                          <Eye className="w-5 h-5 text-secondary" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={resetLayout}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Réinitialiser
        </button>
        <button
          onClick={saveLayout}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default DashboardCustomizer;