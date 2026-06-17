import GamePage from '@/components/GamePage';

export default function Page({ params }: { params: { id: string } }) {
  return <GamePage gameId={params.id} />;
}
