module.exports = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Helvetica Neue, Helvetica, Arial, sans-serif" color="#333"/>
      <mj-button background-color="#56c8e9" color="#fff" border-radius="3px"/>
      <mj-text line-height="20px"></mj-text>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f2f2f2">
    <mj-wrapper>
      <!-- Header -->
      <mj-section padding-bottom="0" background-color="#FFFFFF" text-align="left">
        <mj-column width="100%">
          <mj-image width="{{ logo.width }}" src="{{ logo.src }}"></mj-image>
          <mj-divider padding-top="0" padding-bottom="0" padding-left="0" padding-right="0" border-width="5px" border-color="#56c8e9"/>
        </mj-column>
      </mj-section>
      <!-- Content -->
      <mj-section padding-bottom="0" background-color="#fff">
        <mj-column width="100%">
          <mj-text>
            <h3>{{ subject }}</h3>
            <p>{{ text | nl2br }}</p>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`;
