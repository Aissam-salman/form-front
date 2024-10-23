import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Workshop } from '@/types/Workshop';

interface WorkshopCardProps {
  workshop: Workshop;
  onSave: (workshop: Workshop) => void;
  onChange: (workshop: Workshop) => void;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onSave, onChange }) => {
  return (
    <div className="p-12 min-w-[80%] rounded-xl shadow-xl">
      <div className="p-12 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
           {workshop.name}
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date de début</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded"
                value={workshop.startDate}
                onChange={(e) => onChange({ ...workshop, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date de fin</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded"
                value={workshop.endDate}
                onChange={(e) => onChange({ ...workshop, endDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ce que je retiens</label>
            <Textarea 
              placeholder="Notez ici ce que vous avez retenu..."
              value={workshop.learnings}
              onChange={(e) => onChange({ ...workshop, learnings: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Commentaire Formateur</label>
            <Textarea 
              placeholder="Commentaires du formateur..."
              value={workshop.trainerComments}
              onChange={(e) => onChange({ ...workshop, trainerComments: e.target.value })}
              disabled={true}
              className="min-h-[100px] "
            />
          </div>

          <Button onClick={() => onSave(workshop)} className="w-full">
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;