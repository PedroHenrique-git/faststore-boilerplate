import Script from 'next/script';

function Vtex() {
  return (
    <>
      <Script
        key="vtexrc.js-init"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
            window.sendrc=function(en,ed){window.NavigationCapture&&window.NavigationCapture.sendEvent(en,ed)};
          `,
        }}
        strategy="worker"
      />
      <Script
        key="vtexrc.js-script"
        type="text/partytown"
        async
        src="https://io.vtex.com.br/rc/rc.js"
        strategy="worker"
      />
    </>
  );
}

export default Vtex;
