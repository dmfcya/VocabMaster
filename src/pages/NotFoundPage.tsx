import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="text-6xl mb-4">🔍</span>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">页面未找到</h2>
      <p className="text-slate-500 mb-6">你访问的页面不存在</p>
      <Button onClick={() => navigate('/')}>返回首页</Button>
    </div>
  );
}
