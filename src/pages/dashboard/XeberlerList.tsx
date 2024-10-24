import { Helmet } from 'react-helmet-async';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Xəbərlər` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BlankView title="Xəbərlər" />
    </>
  );
}