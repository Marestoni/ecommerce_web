'use client';

import Link from 'next/link';
import ProfileCard from '../components/ProfileCard';

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Minha Conta</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProfileCard title="Meus Dados" href="/profile/meus-dados" />
        <ProfileCard title="Endereços" href="/profile/enderecos" />
        <ProfileCard title="Meus Pedidos" href="#" disabled />
        <ProfileCard title="Métodos de Pagamento" href="#" disabled />
      </div>
    </div>
  );
}
