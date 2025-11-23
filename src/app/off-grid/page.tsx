import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect to the main off-grid page
  redirect('/pv-battery/off-grid');
}
