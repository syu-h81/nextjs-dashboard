import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  const cards = [
    {
      title: 'Collected',
      value: totalPaidInvoices,
      type: 'collected',
    },
    {
      title: 'Pending',
      value: totalPendingInvoices,
      type: 'pending',
    },
    {
      title: 'Total Invoices',
      value: numberOfInvoices,
      type: 'invoices',
    },
    {
      title: 'Total Customers',
      value: numberOfCustomers,
      type: 'customers',
    },
  ] as const;

  return (
    <>
      {cards.map((card) => {
        const Icon = iconMap[card.type];

        return (
          <div
            key={card.title}
            className="rounded-xl bg-gray-50 p-2 shadow-sm"
          >
            <div className="flex p-4">
              {Icon ? (
                <Icon className="h-5 w-5 text-gray-700" />
              ) : null}
              <h3 className="ml-2 text-sm font-medium">
                {card.title}
              </h3>
            </div>

            <p
              className={`${lusitana.className}
                truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
              {card.value}
            </p>
          </div>
        );
      })}
    </>
  );
}