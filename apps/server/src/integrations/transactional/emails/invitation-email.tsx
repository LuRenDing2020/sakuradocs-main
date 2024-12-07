import { Section, Text, Button } from '@react-email/components';
import * as React from 'react';
import { button, content, paragraph } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  inviteLink: string;
}

export const InvitationEmail = ({ inviteLink }: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={paragraph}>您好！</Text>
        <Text style={paragraph}>您已经被邀请加入 SAKURA DOCS ！</Text>
        <Text style={paragraph}>
          请点击按钮以同意邀请
        </Text>
      </Section>
      <Section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '15px',
          paddingBottom: '15px',
        }}
      >
        <Button href={inviteLink} style={button}>
          同意邀请
        </Button>
      </Section>
    </MailBody>
  );
};

export default InvitationEmail;
