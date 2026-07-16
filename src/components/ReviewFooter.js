import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { markCorrect, markWrong, selectCardStudyRecord } from '../redux/slices/studySlice';
import { addMissingNote } from '../redux/slices/notesSlice';
import { isReviewDue } from '../utils/ebbinghaus';

function formatDate(value) {
  const d = new Date(value);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function ReviewBadge({ id }) {
  const record = useSelector((state) => selectCardStudyRecord(state, id));
  if (!record) return null;

  const due = !record.isCompleted && isReviewDue(record.nextReviewDate);

  if (record.isCompleted) {
    return (
      <View style={[styles.badge, styles.badgeDone]}>
        <Text style={styles.badgeText}>🎓 완전 습득</Text>
      </View>
    );
  }
  if (due) {
    return (
      <View style={[styles.badge, styles.badgeDue]}>
        <Text style={styles.badgeText}>오늘 복습!</Text>
      </View>
    );
  }
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeTextMuted}>
        다음 복습 {formatDate(record.nextReviewDate)} · {record.stage}/5단계
      </Text>
    </View>
  );
}

export default function ReviewFooter({ id, label }) {
  const dispatch = useDispatch();

  const handleRemembered = () => dispatch(markCorrect({ cardId: id }));
  const handleForgot = () => {
    dispatch(markWrong({ cardId: id }));
    dispatch(
      addMissingNote({
        cardId: id,
        answer: null,
        correctAnswer: label,
        unitId: id,
        sectionId: null
      })
    );
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={[styles.button, styles.forgotButton]} onPress={handleForgot}>
        <Text style={styles.buttonText}>다시 봐야겠어요</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.rememberedButton]} onPress={handleRemembered}>
        <Text style={[styles.buttonText, styles.buttonTextLight]}>잘 기억나요</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eceaf9',
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 8
  },
  badgeDue: {
    backgroundColor: '#ffe4d6'
  },
  badgeDone: {
    backgroundColor: '#dcf5e3'
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#c2410c'
  },
  badgeTextMuted: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6e6e73'
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  forgotButton: {
    backgroundColor: '#f5f5f7',
    borderWidth: 1,
    borderColor: '#d9d9de'
  },
  rememberedButton: {
    backgroundColor: '#34c759'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1c1c1e'
  },
  buttonTextLight: {
    color: '#ffffff'
  }
});
