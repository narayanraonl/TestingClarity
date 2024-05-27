import * as React from 'react';
import { Nav, INavLink, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import axios from 'axios';
const navStyles: Partial<INavStyles> = {
  root: {
    width: "20vw",
    height: "100vh",
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

 
const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: 'http://example.com',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        icon: 'News',
        key: 'key7',
        target: '_blank',
      },
    ],
  },
];

export const NavBasicExample: React.FunctionComponent = () => {
  const bearer = 
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiI4MDE1NDZkMi01NWNjLTRmZjQtYjY2ZC0xMzRiMTIwOGRlYjUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNzE2MjYzOTM3LCJuYmYiOjE3MTYyNjM5MzcsImV4cCI6MTcxNjI2OTU4MCwiYWNyIjoiMSIsImFpbyI6IkFlUUFHLzhXQUFBQWNac3pHU0cwMmo0VkI3S3U0d1Q0RjhqaFVXeW5iSTZOWGFxQjBoNytySFpDSldnVUt1SlRIdVA4TS9VZ2xnR2lISkNvQ3hxZEtkeFNiTHlTTlcwWFMxUlBFQXUrWisrTXhhY21mb2JIVndTNFZYVlM5WTlaejd0Mnd0SlVodktmcTVGR29qYVA3eWcwTDJlaFo5a0s0T3c1K0tZY3lwc05PVmtBWUVYMzk4K21YaDZvQlk3Y1hBSWpKLzZoZVJXcFlsQldKb0ZxZ2tJNmcyZDEwaEkvMlRkdklIaExaUXYxZ2lyU2E0YzlqZmpubkNaVjhTcnFUMyt2c0R4WGRhZGdZNWN3M2VuS29DaUUzVUlOUmY0V1BQMFRVY2lDWlNhMUt3Y0RVandLSUVrPSIsImFtciI6WyJyc2EiLCJtZmEiXSwiYXBwaWQiOiI4MDE1NDZkMi01NWNjLTRmZjQtYjY2ZC0xMzRiMTIwOGRlYjUiLCJhcHBpZGFjciI6IjAiLCJkZXZpY2VpZCI6IjI0NzNlNDVjLThkMzgtNDNiYy04ZmRiLWUyMzJkN2VkYTE0NSIsImZhbWlseV9uYW1lIjoiTmlkdW1vbHUiLCJnaXZlbl9uYW1lIjoiTmFyYXlhbmEiLCJpcGFkZHIiOiIyNDA0OmY4MDE6ODAyODoxOmVlOGQ6MTAyYjpkYzljOmZjZWIiLCJuYW1lIjoiTmFyYXlhbmEgTmlkdW1vbHUiLCJvaWQiOiIzNGE5ZDM1MS0wMTE5LTRmZjctOTVhNi05N2QwOTFjNWI1NTkiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjEyNzUyMTE4NC0xNjA0MDEyOTIwLTE4ODc5Mjc1MjctNzY2NTUyNTgiLCJwdWlkIjoiMTAwMzIwMDM3QTJBMTQzOCIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOUpHRllETVZmUlB0bTBUU3hJSTNyVWFBSnMuIiwic2NwIjoiVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwiLCJzdWIiOiJrWXM5WGhER1R1TloyMmZqLTFmSXZYczAwdzdMUWg3NjdxTFZyOGNsZGVZIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidW5pcXVlX25hbWUiOiJ0LW5uaWR1bW9sdUBtaWNyb3NvZnQuY29tIiwidXBuIjoidC1ubmlkdW1vbHVAbWljcm9zb2Z0LmNvbSIsInV0aSI6ImtuY19NbGVKNmtDNFhMbEtSNVpkQUEiLCJ2ZXIiOiIxLjAiLCJ2ZXJpZmllZF9wcmltYXJ5X2VtYWlsIjpbInQtbm5pZHVtb2x1QG1pY3Jvc29mdC5jb20iXSwidmVyaWZpZWRfc2Vjb25kYXJ5X2VtYWlsIjpbInQtbm5pZHVtb2x1QG1pY3Jvc29mdC5vbm1pY3Jvc29mdC5jb20iLCJ0LW5uaWR1bW9sdUBzZXJ2aWNlLm1pY3Jvc29mdC5jb20iXX0.bb1lRDMVPol5662CeR1LkN53hcCo0XK5WAlTa6nJn0l4beUVyj3aWrP1tFODsEN1umVZKVc_DCYoumswxxeKNYGkh2GzqPvWRASO58E3hxWsuPE3p4d6qXLASywCXmcjEvWqdmD3k6YCxUkOsBzulVNe-vdNjs7PtC3eCPrXsYR3oyhgcfIIxDEXhAd_4mjyNzO8i7yAh8e248wM2xxQqtUngaYWPacIa6oUfPMyHLBptylEbQfSUhSh2dycTnwNNmOXU-G01F6bKZXaWMTLUqtNtJosInqnAOdhx2mbRTFf_w8hpgG_eZk0yULPO93l4SOt7OEQbwrKEl_myaCqBg"
  // const reqObj = {"searchTerm":"6575495",
  // "searchTypes":["InvoiceId","PurchaseId","SubscriptionId","DomainName","PCN","AssetId","EnrollmentId","BillingProfileId"],
  // "attributes":{"testHeader":"{\"scenarios\":\"CST\", \"contact\":\"csteng@microsoft.com\"}"},
  // "testHeader":true,"includeCommercialProfile":true}
  const reqObj = {"searchTerm":"6575495",
  "searchTypes":["InvoiceId","PurchaseId","SubscriptionId","DomainName","PCN","AssetId","EnrollmentId","BillingProfileId"],
}
  // axios.post("https://cst-services-canary.azure.com/customer/api/search/commercial",reqObj,
  //   {
  //     headers:{
  //         Authorization:bearer
  //     }
  // })
  // .then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log(err)
  // })
  axios.post("https://cst-services-canary.azure.com/customer/api/search/commercial",reqObj,
    {
      headers:{
          Authorization:bearer
      }
  })
  .then((res)=>{
    console.log(res.data.profiles[0])
  }).catch((err)=>{
    console.log(err)
  })
  // axios.get("https://cst-services-canary.azure.com/customer/api/search/commercial")
  // .then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log(err)
  // })

  // fetch('https://cst-services-canary.azure.com/customer/api/search/commercial',{
  //   method: 'POST',
  //   headers: {"Content-Type":"application/json"},
  //   body: JSON.stringify({'EnrollmentId':'6575495'})
  // }).then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log(err)
  // })

  return (
    <Nav
      onLinkClick={_onLinkClick}
      selectedKey="key3"
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}
