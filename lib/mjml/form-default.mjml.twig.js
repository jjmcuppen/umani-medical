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
            {% for field in fields %}
              <p>
                <strong>{{ field.label }}</strong><br>
                {% if field.value is iterable %}
                  {{ field.value | join(', ') }}
                {% elseif field.value is same as(true) %}
                  {{ 'Ja' }}
                {% elseif field.value is same as(false) %}
                  {{ 'Nee' }}
                {% else %}
                  {{ field.value | nl2br }}
                {% endif %}
              </p>
            {% endfor %}
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`;
